import requests
import pandas as pd
import os
import datetime
import numpy as np
import logging
import time
import calendar
import json
import sys




s = requests.Session()

def get_logfile_name(consumer: str, sn: str, tm: time.struct_time) -> str:
    return f"{consumer}_{sn}_{tm.tm_year}-{str(tm.tm_mon).zfill(2)}-{str(tm.tm_mday).zfill(2)}.log"

def set_logger(log_file: str) -> logging.Logger:
    
    if not os.path.exists('./logs'):
        os.mkdir('./logs')    
    logger = logging.getLogger('send')
    logger.setLevel(logging.DEBUG)
    fh = logging.FileHandler(os.path.join('./logs', log_file))
    fh.setLevel(logging.DEBUG)
    # create console handler with a higher log level
    ch = logging.StreamHandler()
    ch.setLevel(logging.ERROR)
    # create formatter and add it to the handlers
    formatter = logging.Formatter(fmt='%(asctime)s - %(name)s - %(levelname)s - %(message)s',datefmt='%Y-%m-%d %H:%M:%S')
    ch.setFormatter(formatter)
    fh.setFormatter(formatter)
    # add the handlers to logger
    logger.addHandler(ch)
    logger.addHandler(fh)
    
    return logger

def get_param(name: str) -> object:
    if name in os.environ:
        return os.environ[name]
    else:
        raise Exception(f'Environment variable {name} is not set.')

def open_excel(dir: str, path: str, sheet: str) -> pd.DataFrame:
    return pd.read_excel(os.path.join(dir, path), sheet_name=sheet)

        


def get_time_table_index(tm: time.struct_time) -> int:
    num_of_int = 366*4*24 if calendar.isleap(tm.tm_year - 1) else 365*4*24
    idx = (num_of_int + (tm.tm_yday-1)*96 + tm.tm_hour * 4 + divmod(tm.tm_min,15)[0] - 1) % num_of_int
    return idx


def get_consumption_data(df: pd.DataFrame, idx: int) -> dict:
    if idx in df.index:
        return df.iloc[idx, :].to_dict()
    else:
        return {}
    
def get_production_data(df: pd.DataFrame, idx: int) -> dict:
    if idx in df.index:
        return df.iloc[idx]
    else:
        return None

def get_climate_data(df: pd.DataFrame, idx: int) -> dict:
   if (idx in df.index):
       return df.iloc[idx,:].to_dict()
   else:
       return {}
    


def get_requested_keys(data: dict, keys: str) -> dict:
    ks = [k.strip() for k in keys.split(',')]
    data_new = {}
    for k in data.keys():
        if k in ks:
            data_new[k] = data[k]
    return data_new

def send_data(url: str, sn: str, data: dict) -> requests.Response:
        
    return s.post(
        url=f"http://{url}/api/v1/smartmeter/{sn}/data",
        headers={'Content-Type': 'application/json'},
        data=data
    )

        
    

if __name__== '__main__':

    try:
        consumer = get_param('CONSUMER')
        sn = get_param('SN')
        backend_url = get_param('SMART_COLLECTOR_BACKEND_URL')
        data_dir = get_param('DATA_DIR')
        data_file = get_param('DATA_FILE')
        data_keys = get_param('DATA_KEYS')
    except Exception as e:
        logging.critical(e)
        sys.exit(1)
    
    log_file = get_logfile_name(consumer, sn, datetime.datetime.now().timetuple())
    logger = set_logger(
        log_file=log_file
    )
    
    
    
    try:
        df_climate = open_excel(data_dir, data_file, 'Weather')
        df_consumption = open_excel(data_dir, data_file, consumer)
        df_production = open_excel(data_dir, data_file, 'Total Producers').iloc[:,int(consumer.replace('Consumer',''))-1]
    except Exception as e:
        logger.error(f"Simulation data file cannot be opened. Message: {str(e)}")
        
    
    while True:
        
        time_now = datetime.datetime.now().timetuple()
        try:
            idx = get_time_table_index(tm=time_now)
        except Exception as e:
            logger.warning(e)
        
        data={}
        
        data.update(get_climate_data(
                df = df_climate,
                idx = idx))
        data.update(get_consumption_data(
                df = df_consumption,
                idx = idx))
        
        prod_d = get_production_data(
                df = df_production,
                idx = idx)
        if prod_d is not None:
            data['Total Production'] = prod_d
        
        try:
            data = get_requested_keys(
                data=data,
                keys=data_keys
            )
        except Exception as e:
            logger.warning(e)
            
        
        if data:
            try:
                
                logger.info({
                        key.strip().lower().replace(' ','_'): value
                        for key, value in data.items()
                    })
                res = send_data(
                    url=backend_url,
                    sn=sn,
                    data=json.dumps({
                        key.strip().lower().replace(' ','_'): value
                        for key, value in data.items()
                    })
                )
                if res.status_code != 200:
                    logger.warning(f"Status code: {res.status_code}, Message: {res.text}")
            except Exception as e:
                logger.error(str(e))
        else:
            logger.warning('There is no data to send.')
        
        time.sleep(900)
        
    s.close()