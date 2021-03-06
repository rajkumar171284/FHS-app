export class Myclass {
    response = [];
    data = [];
    screenLoader: boolean;
    plotlyData;
    chartType: string;
    sensorList:any;
    operatorList=[
       
        {
        key:'> (Greater than)',value:'greaterthan'
    },
    {
        key:'< (Less than)',value:'lessthan'
    }
    ,
    {
        key:'= (Equal to)',value:'equal'
    }
];
chartFilters=[]
    
}
export const filters=["Last 5 minutes",
"Last 15 minutes",
"Last 30 minutes",
"Last 1 Hour",
"Last 3 Hours",
"Last 6 Hours",
"Last 24 Hours",
"Last 7 days",
"Last 30 days"]
export class classSensor{
    sensorID="";
    operator="";
    value="";
    person_name="";
    phoneNO="";
    status;
}
export interface interfaceEditAlert{
    sensorID;
    operator;
    value;
    name;
    phoneNO;
    status;
    id;
}
export interface interfaceSensor{
    sensorID;
    operator;
    value;
    person_name;
    phoneNO;
    status;
}
export interface interfaceSensorList{
    sensorid;
    operator;
    value;
    name;
    phoneno;
    status;
    alertid;
}
export interface InterfacePlotlyPattern1{
data:[],layout:JSON;
}

export class ClassPlotlyPattern1{
    data= [];
    layout= { }
}
export interface sensorId {
    "sensorid": "",
    "lat": '',
    "lng": '',
    "zone": "FHS",
    "type": "",
    "unit": "",
    "value": "",
    "date": "",
    "status": '',
    "history": any[]
}
