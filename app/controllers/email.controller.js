var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'onairentradas@gmail.com',
        pass: 'jratqkyigrprgjbi'
    }
})

exports.correoEntradas = (req,res)=>{
   
   
    
    var htmlEnvio = `
    <body style="margin: 1em;">
    <table style="text-align: center; border-spacing: 2em; background-color:#FFE5E5 ">
        <tr >
            <th colspan="2" >
                <h1 >Entradas para ${req.body.titulo}</h1> 
            </th>
        </tr>
        <tr >
            <td>
               <h3> Lugar: ${req.body.lugar} </h3>
            </td>
            <td >
               <h3> Fecha: ${req.body.fechaInicio} ${req.body.fechaFin? ' / '+req.body.fechaFin:""} </h3>
            </td>
        </tr>
        <tr>
            <td colspan="2" style="border-top: 1px solid black; margin-top:5px;"> <h2><b>Email: ${req.body.email}</b> </h2></td>
        </tr>
        <tr>
            <td><h3>Numero de entradas: <b>${req.body.numero}</b></h3></td>
            <td>
                <figure style="text-align:center ;">
                <img src="https://alebes.files.wordpress.com/2019/03/barcode-306926_1280.png?w=648" alt="codigo" style="width:120px;height:70px; margin:0; ">
                <figcaption style="margin:0;">${req.body.id}</figcaption>
            </figure>

            </td>
        </tr>
        
    </table>
</body> `;
    

    var mailOptions = {
        from: 'onairentradas@gmail.com',
        to: req.body.email,
        subject: 'Aqui tienes tus entradas para ' + req.body.titulo,
        html: htmlEnvio
    }
    
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        }else{
            console.log('email enviado: ' + info.response);
            res.send(info.response);
        }
    })
}

exports.correoContacto = (req,res) =>{


    htmlEnvio = `
    <h2>Pregunta de ${req.body.nombre}</h2>
    <p>${req.body.pregunta}</p>
    `

    var mailOptions = {
        from:'onairentradas@gmail.com',
        to: 'onairentradas@gmail.com',
        subject: 'pregunta de ' + req.body.email,
        html: htmlEnvio
    }
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        }else{
            console.log('email enviado: ' + info.response);
            res.send(info.response);
        }
    })

}