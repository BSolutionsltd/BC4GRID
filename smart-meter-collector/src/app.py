from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS, cross_origin
from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database
from sqlalchemy.exc import IntegrityError, NoResultFound
from flask_migrate import Migrate
from models import *
from sqlalchemy import Time, cast
from psycopg2.errors import UniqueViolation
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:bc4grid@localhost/smart-meter-collector"
from flask import jsonify

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


@app.route('/api/v1/smartmeter/<id>/balance', methods = ['GET'])
def userBalance(id):
    
    from_time = request.args.get('from')
    to_time = request.args.get('to')
    print(from_time)
    print(to_time)
    userdata = db.session.query(db.func.sum(SmartMeterData.total_consumption).label("total_consumption"),db.func.sum(SmartMeterData.total_production).label("total_production")).filter(SmartMeterData.smartmeter_id == id,cast(SmartMeterData.time, Time) >= cast(datetime.strptime(from_time,'%Y-%m-%d %H:%M:%S'),Time),cast(SmartMeterData.time, Time) <= cast(datetime.strptime(to_time,'%Y-%m-%d %H:%M:%S'),Time))

    return [
        {
            'total_consumption': d.total_consumption,
            'total_production': d.total_production
        } for d in userdata
    ]

@app.route('/api/v1/smartmeter/<id>', methods = ['GET'])
def smartMeterData(id):
    
    from_time = request.args.get('from')
    to_time = request.args.get('to')

    smartmeterdata = db.session.query(SmartMeterData).filter(SmartMeterData.smartmeter_id == id,cast(SmartMeterData.time, Time) >= cast(datetime.strptime(from_time,'%Y-%m-%d %H:%M:%S'),Time),cast(SmartMeterData.time, Time) <= cast(datetime.strptime(to_time,'%Y-%m-%d %H:%M:%S'),Time)).all()

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
    app.run()