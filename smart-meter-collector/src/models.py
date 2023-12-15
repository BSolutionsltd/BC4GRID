from __future__ import annotations
from typing import List
from sqlalchemy import Column, ForeignKey, Integer, String, Date, DateTime, create_engine, Float
from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase, relationship, Session
from datetime import datetime
from sqlalchemy import UniqueConstraint


class Base(DeclarativeBase):
    pass

class SmartMeter(Base):
    __tablename__='smartmeter'
    id = mapped_column(Integer, primary_key=True)
    sn = mapped_column(String(20), nullable = False, unique = True)
    model = mapped_column(String(100), nullable=True)
    user_id : Mapped[str] = mapped_column(ForeignKey("user.id"), nullable=False)
    user : Mapped["User"] = relationship(back_populates="smartmeter")
    smartmeter_data : Mapped[List["SmartMeterData"]] = relationship(back_populates="smartmeter")
    def __init__(
        self,
        data
    ):
        self.sn = data['sn']
        if 'model' in data:
            self.model = data['model']
        
class SmartMeterData(Base):
    __tablename__='smartmeterdata'
    id =  mapped_column(Integer, primary_key=True)
    time = mapped_column(DateTime, nullable=False)
    ac = mapped_column(Float, nullable=True)
    dish_washer = mapped_column(Float, nullable=True)
    washing_machine = mapped_column(Float, nullable=True)
    dryer = mapped_column(Float, nullable=True)
    water_heater = mapped_column(Float, nullable=True)
    tv = mapped_column(Float, nullable=True)
    microwave = mapped_column(Float, nullable=True)
    kettle = mapped_column(Float, nullable=True)
    lighting = mapped_column(Float, nullable=True)
    refrigerator = mapped_column(Float, nullable=True)
    total_consumption = mapped_column(Float, nullable=True)
    total_production = mapped_column(Float, nullable=True)
    smartmeter_id = mapped_column(ForeignKey("smartmeter.id"), nullable=False)
    smartmeter : Mapped["SmartMeter"] = relationship(back_populates="smartmeter_data")
    _table_args__ = (UniqueConstraint('sn', 'time', name='sn_time_unique'))
    
    def __init__(
        self,
        smartmeter: SmartMeter,
        time:str,
        data: dict
    ):
        self.time = time
        self.smartmeter = smartmeter
        if 'ac' in data:
            self.ac = data['ac']
        if 'dish_washer' in data:
            self.dish_washer = data['dish_washer']
        if 'washing_machine' in data:
            self.washing_machine = data['washing_machine']
        if 'dryer' in data:
            self.dryer = data['dryer']
        if 'water_heater' in data:
            self.water_heater = data['water_heater']
        if 'tv' in data:
            self.tv = data['tv']
        if 'microwave' in data:
            self.microwave = data['microwave']
        if 'kettle' in data:
            self.kettle = data['kettle']
        if 'lighting' in data:
            self.lighting = data['lighting']
        if 'refrigerator' in data:
            self.refrigerator = data['refrigerator']
        if 'total_consumption' in data:
            self.total_consumption = data['total_consumption']
        if 'total_production' in data:
            self.total_production = data['total_production']
        
class User(Base):
    __tablename__='user'
    id =  mapped_column(Integer, primary_key=True)
    code = mapped_column(String(20),nullable=False, unique=True)
    firstname = mapped_column(String(50), nullable=False)
    lastname = mapped_column(String(50), nullable=False)
    address = mapped_column(String(300), nullable=True)
    postcode = mapped_column(Integer, nullable=True)
    city = mapped_column(String(30), nullable=True)
    country = mapped_column(String(30), nullable=True)
    email = mapped_column(String(100), nullable=False, unique=True)
    password = mapped_column(String(100), nullable=False)
    smartmeter : Mapped["SmartMeter"] = relationship(back_populates="user")
    def __init__(self,
        user: dict,
        smartmeter: SmartMeter = None
    ):
        if 'code' in user:
            self.code = user['code']
        if 'firstname' in user:
            self.firstname = user['firstname']
        if 'lastname' in user:
            self.lastname = user['lastname']
        if 'address' in user:
            self.address = user['address']
        if 'postcode' in user:
            self.postcode = user['postcode']
        if 'city' in user:
            self.city = user['city']
        if 'country' in user:
            self.country = user['country']
        if 'email' in user:
            self.email = user['email']
        if 'password' in user:
            self.password = user['password']
        if smartmeter is not None:
            self.smartmeter = smartmeter
