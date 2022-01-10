import { Testimonial } from "../models/Testimoniales.js";

const guardarTestimonial = async (req, res) => {
    //Validar...
    const {nombre, email, mensaje } = req.body;
    const errores = [];
    if(nombre.trim() === ''){
        errores.push({mensaje: 'El Nombre esta vacio'});
    }
    if(email.trim() === ''){
        errores.push({mensaje: 'El Email esta vacio'});
    }
    if(mensaje.trim() === ''){
        errores.push({mensaje: 'No hay mensaje'});
    }
    if(errores.length > 0) {
        //Consultar testimoniales Existentes
        const testimoniales = await Testimonial.findAll();
        //Mostrar vista con errores
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            email,
            mensaje,
            testimoniales
        })
    }else {
        //Almacenarlo en la BD
        try {
            await Testimonial.create({
                nombre,
                email,
                mensaje
            });
            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }
    }
}

export {
    guardarTestimonial
}