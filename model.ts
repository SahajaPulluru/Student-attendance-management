export interface student{
    id?:number,
    name: string,
    class:string,
    email: string,
    phoneNumber: string,
    semester:number,
    status:boolean
      
}
export interface attendance{
    id?:number,
    date:string,
    present:Array<student>
}
export interface attendanceChart{
    name:string,
    value:number
}