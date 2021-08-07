export function ObjectSanitize(Obj: any): any{
    // @ts-ignore
    Object.keys(Obj).forEach(key => Obj[key] === undefined ? delete Obj[key] : {});
    return Obj;
}
