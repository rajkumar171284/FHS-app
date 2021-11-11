export class Myclass {
    response = [];
    data = [];
    screenLoader: boolean;
    plotlyData;
    chartType: string;

    operatorList=[
        {
            key:'-- Select --',value:''
        },
        {
        key:'-- > --',value:'greaterthan'
    },
    {
        key:'-- < --',value:'lessthan'
    }
]
    
}
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
    data= [
        {
            x: [1, 2, 3], y: [2, 6, 3], type: ''
                , mode: 'lines+points', marker: { color: 'red' }
        },
        // { x: [1, 2, 3], y: [2, 5, 3], type: 'bar' },
    ];
    layout= { width: 320, height: 240, title: 'A Fancy Plot' }
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
