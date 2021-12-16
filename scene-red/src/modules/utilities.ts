export function distance(pos1: Vector3, pos2: Vector3): number {
  
    const a = pos1.x - pos2.x
    const b = pos1.z - pos2.z
   
    return a * a + b * b
}
  
export function realDistance(pos1: Vector3, pos2: Vector3): number {
    const a = pos1.x - pos2.x
    const b = pos1.z - pos2.z
    return Math.sqrt(a * a + b * b)
}
  
export function ToDegrees(radians){
    
    var degrees = radians * (180/Math.PI)
    return degrees
}

export function ToRadian(degrees)
{
    var pi = Math.PI;
    return degrees * (pi/180);
}

export function Vec3FromString(text:string):Vector3{

    var res = text.substring(1, text.length-1);
    var coords = res.split(",")

    var vector = new Vector3 (parseFloat(coords[0]), parseFloat(coords[1]), parseFloat(coords[2]) )

    return vector;

}
export function QuaternionFromString(text:string):Quaternion{

    var res = text.substring(1, text.length-1);
    var coords = res.split(",")

    var rotation = new Quaternion(parseFloat(coords[0]), parseFloat(coords[1]), parseFloat(coords[2]),parseFloat(coords[3]))

    return rotation;

}

export function reflectVec3(vec1:Vector3, normal:Vector3):Vector3{
        //  r = a - 2<a, n> n
    let dot = 2* Vector3.Dot(vec1, normal)
    let reflected = vec1.subtract( normal.multiplyByFloats(dot,dot,dot))
  
    return reflected

}