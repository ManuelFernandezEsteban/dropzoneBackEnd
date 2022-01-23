const { response } = require("express");


const fileUpload = (req, res = response) => {
    const id = req.params.id;
    //validar que llega un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay archivo'
        });
    }

    let archivosASubir = [];
    
    if (!req.files.archivo.length){//viene un solo archivo
        
        archivosASubir.push(req.files.archivo);
    }
    else{//vienen varios
        archivosASubir=req.files.archivo;
    }
    console.log(archivosASubir);
    archivosASubir.forEach(archivo => {

        let path = './uploads/usuarios/';
        let nombreArchivo = id + '-' + archivo.name;
        path = path + nombreArchivo;
        console.log(path);
        archivo.mv(path, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    ok: false,
                    msg: 'Error al mover el archivo'
                })
            }
        });
    })

    res.json({
        ok: true,
        msg: 'fileUpload'
    });

    
}

module.exports = { fileUpload }