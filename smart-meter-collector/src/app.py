from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS
from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database
from sqlalchemy.exc import IntegrityError, NoResultFound
from flask_migrate import Migrate
from models import *
import os



app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://{os.getenv('POSTGRES_USER')}:{os.getenv('POSTGRES_PASSWORD')}@{os.getenv('POSTGRES_HOST')}/{os.getenv('POSTGRES_DATABASE')}"

db = SQLAlchemy(app)
cors = CORS(app)
migrate = Migrate(app, db)
app.app_context().push()

engine = create_engine(app.config['SQLALCHEMY_DATABASE_URI'])
if not database_exists(engine.url):
    create_database(engine.url)

Base.metadata.create_all(engine)


def row2dict(row):
    d = {}
    for column in row.__table__.columns:
        d[column.name] = str(getattr(row, column.name))

    return d

def formatUserData(user: User):
    return {
        'id': user.id,
        'code': user.code,
        'firstname': user.firstname,
        'lastname': user.lastname,
        'address': user.address,
        'postcode': user.postcode,
        'city': user.city,
        'country': user.country,
        'email': user.email,
        'password': user.password,
        'smartmeter': {
            'id': user.smartmeter.id,
            'sn': user.smartmeter.sn,
            'model': user.smartmeter.model
        }
    }

def formatSmartMeterData(smartmeterdata: SmartMeterData):
    return {
        'id': smartmeterdata.id,
        'time': smartmeterdata.time,
        'ac': smartmeterdata.ac,
        'dish_washer': smartmeterdata.dish_washer,
        'washing_machine': smartmeterdata.washing_machine,
        'dryer': smartmeterdata.dryer,
        'water_heater': smartmeterdata.water_heater,
        'tv': smartmeterdata.tv,
        'microwave': smartmeterdata.microwave,
        'kettle': smartmeterdata.kettle,
        'lighting': smartmeterdata.lighting,
        'refrigerator': smartmeterdata.refrigerator,
        'total_consumption': smartmeterdata.total_consumption,
        'total_production': smartmeterdata.total_production,
        'smartmeter': {
            'id': smartmeterdata.smartmeter.id,
            'sn': smartmeterdata.smartmeter.sn,
            'model': smartmeterdata.smartmeter.model
        }
    }

@app.route('/api/v1/smartmeter/<sn>/data', methods = ['POST'])
def smartMeterDataSend(sn):
    try:
        smartmeter = db.session.query(SmartMeter).filter_by(sn=sn).one()
    except NoResultFound as e:
        return {
            'message': f'Meter with serial number {sn} does not exist.' 
        }, 404
    
    time = str(datetime.now())
    data = request.json
    smdata = SmartMeterData(smartmeter = smartmeter, time = time, data = data)

    db.session.add(smdata)
    db.session.commit()
    
    return formatSmartMeterData(smartmeterdata = smdata)

@app.route('/check', methods = ['GET'])
def check():
    return "OK"

@app.route('/api/v1/smartmeter/<sn>/balance', methods = ['GET'])
def userBalance(sn):
    
    from_time = request.args.get('from')
    to_time = request.args.get('to')
    
    try:
        smartmeter = db.session.query(SmartMeter).filter(SmartMeter.sn == sn).one()
        
        smartmeterdata = db.session.query(db.func.sum(SmartMeterData.total_consumption).label("total_consumption"),db.func.sum(SmartMeterData.total_production).label("total_production")).filter(SmartMeterData.smartmeter_id == smartmeter.id)
        
        if from_time is not None:
            try:
                from_time = datetime.strptime(from_time,'%Y-%m-%dT%H:%M:%S')
                smartmeterdata = smartmeterdata.filter(SmartMeterData.time>= from_time)
            except Exception as e:
                return f"The start time of the interval: {from_time} is invalid.", 400
        if to_time is not None:
            try:
                to_time = datetime.strptime(to_time,'%Y-%m-%dT%H:%M:%S')
                smartmeterdata = smartmeterdata.filter(SmartMeterData.time<= to_time)
            except Exception as e:
                return f"The end time of the interval: {to_time} is invalid.", 400

        return [
                {
                    'total_consumption': d.total_consumption,
                    'total_production': d.total_production
                } for d in smartmeterdata
        ]
    except Exception as e:
        return {
            'status_code': 400,
            'message': f"Ensure that {sn} is a valid serial number. {e}"
        }, 400
    
    
    
 
   

@app.route('/api/v1/smartmeter/<sn>', methods = ['GET'])
def smartMeterData(sn):
    
    from_time = request.args.get('from')
    to_time = request.args.get('to')
    
    try:
        smartmeter = db.session.query(SmartMeter).filter(SmartMeter.sn == sn).one()
        smartmeterdata = db.session.query(SmartMeterData).filter(SmartMeterData.smartmeter_id == smartmeter.id)
        
        if from_time is not None:
            try:
                from_time = datetime.strptime(from_time,'%Y-%m-%dT%H:%M:%S')
                smartmeterdata = smartmeterdata.filter(SmartMeterData.time>= from_time)
            except Exception as e:
                return f"The start time of the interval: {from_time} is invalid.", 400
        if to_time is not None:
            try:
                to_time = datetime.strptime(to_time,'%Y-%m-%dT%H:%M:%S')
                smartmeterdata = smartmeterdata.filter(SmartMeterData.time<= to_time)
            except Exception as e:
                return f"The end time of the interval: {to_time} is invalid.", 400
    
        smartmeterdata = smartmeterdata.all()
    except Exception as e:
        return {
            'status_code': 400,
            'message': f"Ensure that {sn} is a valid serial number. {e}"
        }, 400
        
    
# @app.route('/api/v1/smartmeter/<sn>', methods = ['GET'])
# def smartMeterDataBySN(sn):
    
#     from_time = request.args.get('from')
#     to_time = request.args.get('to')
    
#     try:
#         smartmeter = db.session.query(SmartMeter).filter(sn=sn).one()
        
        
#         smartmeterdata = db.session.query(SmartMeterData).filter(SmartMeterData.smartmeter_id == smartmeter.id)
        
#         if from_time is not None:
#             try:
#                 from_time = datetime.strptime(from_time,'%Y-%m-%dT%H:%M:%S')
#                 smartmeterdata = smartmeterdata.filter(SmartMeterData.time>= from_time)
#             except Exception as e:
#                 return f"The start time of the interval: {from_time} is invalid.", 400
#         if to_time is not None:
#             try:
#                 to_time = datetime.strptime(to_time,'%Y-%m-%dT%H:%M:%S')
#                 smartmeterdata = smartmeterdata.filter(SmartMeterData.time<= to_time)
#             except Exception as e:
#                 return f"The end time of the interval: {to_time} is invalid.", 400
    
#         smartmeterdata = smartmeterdata.all()
#     except Exception:
#         return {
#             'status_code': 400,
#             'message': f"ID MUST be ineger. {id} is not an integer."
#         }, 400
         
    
    
    
    

    return [formatSmartMeterData(d) for d in smartmeterdata], 200



@app.route('/api/v1/user', methods=['POST'])
def addUser():
    #ime = request.args.get('ime')
    # print(ime)
    try:
        smartmeter_data = request.json['smartmeter']
        user_data = request.json
        # print(smartmeter_data)
        # print(user_data)
        del user_data['smartmeter']
        smartmeter = SmartMeter(smartmeter_data)
        user = User(user = user_data, smartmeter = smartmeter)
        db.session.add(user)
        db.session.commit()
    except IntegrityError as e:
        return {
            'message': str(e)
                }, 400
    return formatUserData(user)

if __name__ == '__main__':
    app.run(host="0.0.0.0")