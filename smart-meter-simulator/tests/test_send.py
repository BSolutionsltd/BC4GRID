from context import send
import datetime
import os
import pytest
import requests_mock

def test_get_logfile_name_filename_01():
    time_now = datetime.datetime.strptime('2023-11-07 23:06:45', '%Y-%m-%d %H:%M:%S').timetuple()
    assert send.get_logfile_name(time_now) == "2023-11-07.log"
    
def test_get_logfile_name_filename_02():
    time_now = datetime.datetime.strptime('2023-05-05 01:06:07', '%Y-%m-%d %H:%M:%S').timetuple()
    assert send.get_logfile_name(time_now) == "2023-05-05.log"
    
def test_get_logfile_name_filename_03():
    time_now = datetime.datetime.strptime('2023-11-11 22:06:07', '%Y-%m-%d %H:%M:%S').timetuple()
    assert send.get_logfile_name(time_now) == "2023-11-11.log"


def test_set_logger_01():
    logger = send.set_logger('2023-11-12.log')
    logger.info('Info test message')
    logger.warning('Warn test message')
    logger.error('Error test message')
    
    with open('./logs/2023-11-12.log', 'r') as f:
        lines = f.read().splitlines()
        f.close()
     
    assert os.path.exists('./logs/2023-11-12.log') and ('Info test message' in lines[0]) and ('Warn test message' in lines[1]) and ('Error test message' in lines[2])
    
def test_get_param_01():
    logger = send.set_logger('2023-11-12.log')
    os.environ['PROB'] = 'prob'
    param = send.get_param('PROB')
    assert param == 'prob'

    
def test_get_param_02():
    with pytest.raises(Exception, match=r"PROBN is not set"):
          logger = send.set_logger('2023-11-12.log')
          param = send.get_param('PROBN')
          
def test_open_excel():
    df = send.open_excel(dir = './data', path='Dataset.xlsx', sheet='Consumer1')
    assert isinstance(df, send.pd.DataFrame)
    
def test_get_time_table_index():
    tm1 = datetime.datetime.strptime('2023-01-01 00:05:00', '%Y-%m-%d %H:%M:%S').timetuple()
    tm2 = datetime.datetime.strptime('2023-01-01 00:20:00', '%Y-%m-%d %H:%M:%S').timetuple()
    tm3 = datetime.datetime.strptime('2023-01-01 01:00:01', '%Y-%m-%d %H:%M:%S').timetuple()
    tm4 = datetime.datetime.strptime('2023-12-31 23:55:06', '%Y-%m-%d %H:%M:%S').timetuple()
    assert (send.get_time_table_index(tm1) == 365*4*24 - 1) and (send.get_time_table_index(tm3) == 3)  and (send.get_time_table_index(tm2) == 0) and (send.get_time_table_index(tm4) == 365*4*24 - 2)

def test_consumption_data_01():
    df = send.pd.DataFrame(data=[{'A': 3,'B': 5,'C': 5}, {'A': 1,'B': 2,'C': 1}, {'A': 2,'B': 0,'C': 4}])
    assert send.get_consumption_data(df=df, idx=0) == {'A': 3,'B': 5,'C': 5} and send.get_consumption_data(df=df, idx=2) == {'A': 2,'B': 0,'C': 4}
    
        
def test_climate_data_04():
    df = send.pd.DataFrame(data=[{'A': 3,'B': 5,'C': 5}, {'A': 1,'B': 2,'C': 1}, {'A': 2,'B': 0,'C': 4}])
    assert send.get_climate_data(df=df, idx=0) == {'A': 3,'B': 5,'C': 5} and send.get_consumption_data(df=df, idx=2) == {'A': 2,'B': 0,'C': 4}
    


def test_get_requested_keys_01():
    data = {
        'A': 1,
        'B': 2,
        'C': 3
    }
    keys = 'A, B'
    
    assert send.get_requested_keys(data, keys) == {
        'A': 1,
        'B': 2
    }


def test_send_data_01():
    # os.environ['SMART_COLLECTOR_BACKEND_URL'] = 'mock://test.smartcollector.com'
    # os.environ['SN'] = 'A7FG4511'
    adapter = requests_mock.Adapter()
    send.s.mount('mock://', adapter)
    adapter.register_uri('POST', 'mock://test.smartcollector.com/send/A7FG4511', text='Data sent.')
    res = send.send_data(
        url='mock://test.smartcollector.com',
        sn = 'A7FG4511',
        data = {
            'A': 1,
            'B': 4
        }
    )
    assert res.status_code == 200


    