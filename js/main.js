$('.dropify').dropify();

/*************************************************************
 ************************ VALIDACIÓN *************************
 ************************************************************/
function validacion(array) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i].val() == '') {
            array[i].parents('.form-group').addClass('has-error');
            count++;
        } else {
            array[i].parents('.form-group').removeClass('has-error').addClass('has-success');
        }
    }

    if (count == 0) {
        return true;
    } else {
        return count;
    }
}

/*************************************************************
 ****************** DESPLIEGUE FORMULARIO ********************
 ************************************************************/

$('.crear-usuario').on('click', function (e) {
    e.preventDefault();
    if ($(this).find('i').hasClass('glyphicon-menu-down')) {
        $(document).find('.usuario').removeClass('esconder');
        $(this).find('.glyphicon-menu-down').addClass('glyphicon-menu-up').removeClass('glyphicon-menu-down');
    } else {
        $(document).find('.usuario').addClass('esconder');
        $(this).find('.glyphicon-menu-up').addClass('glyphicon-menu-down').removeClass('glyphicon-menu-up');
    }
});
$('.datos-basicos').on('click', function (e) {
    e.preventDefault();
    if ($(this).find('i').hasClass('glyphicon-menu-down')) {
        $(document).find('.basico').removeClass('esconder');
        $(this).find('.glyphicon-menu-down').addClass('glyphicon-menu-up').removeClass('glyphicon-menu-down');
    } else {
        $(document).find('.basico').addClass('esconder');
        $(this).find('.glyphicon-menu-up').addClass('glyphicon-menu-down').removeClass('glyphicon-menu-up');
    }
});

/*************************************************************
 *********************** CREAR USUARIO ***********************
 ************************************************************/

$('#crearUsuario').on('submit', function (e) {
    e.preventDefault();
    let countCreacion = 0;
    let countBasicos = 0;
    let usuario = $(this).find("[name='usuario']");
    let password = $(this).find("[name = 'password']");
    let rptpassword = $(this).find("[name='rptpassword']");
    let email = $(this).find("[name='email']");
    let role = $(this).find("[name='role']");
    let arrayUsuario = [usuario, password, rptpassword, email];

    let foto = $(this).find("[name='file']");
    let titulo = $(this).find("[name='title']");
    let numreparacion = $(this).find("[name='numRepair']");
    let horario = $(this).find("[name='horario']");
    let direccion = $(this).find("[name='direccion']");
    let telefono = $(this).find("[name='telefono']");
    let whatsapp = $(this).find("[name='whatsapp']");
    let facebook = $(this).find("[name='facebook']");
    let nombreHoja = $(this).find("[name='nombreHoja']");
    let datosInteres = $(this).find("[name='datosInteres']");
    let datosResponsable = $(this).find("[name='datosResponsable']");
    let arrayBasicos = [titulo, numreparacion, horario, direccion, telefono, whatsapp, facebook, nombreHoja, datosInteres, datosResponsable];

    // VALIDACION USUARIO
    countCreacion = validacion(arrayUsuario);

    if (role.val() == '-1') {
        role.parents('.form-group').addClass('has-error');
        if (countBasicos !== true) {
            countBasicos = 1;
        } else {
            countBasicos++;
        }
    } else {
        role.parents('.form-group').removeClass('has-error').addClass('has-success');
    }
    // VALIDACION DATOS BÁSICOS
    countBasicos = validacion(arrayBasicos);

    if (countCreacion != true) {
        if ($(document).find('.crear-usuario').hasClass('btn-desplegar')) {
            $(document).find('.crear-usuario').addClass('btn-danger').removeClass('btn-desplegar');
            $(document).find('.crear-usuario').append("<i class='glyphicon glyphicon-remove-sign' style='position: absolute; right: 20px; top: 22px;'></i>");
        }
    } else {
        $(document).find('.crear-usuario').addClass('btn-desplegar').removeClass('btn-danger');
        $(document).find('.crear-usuario').find('.glyphicon-remove-sign').remove();
    }
    if (countBasicos != true) {
        if ($(document).find('.datos-basicos').hasClass('btn-desplegar')) {
            $(document).find('.datos-basicos').addClass('btn-danger').removeClass('btn-desplegar');
            $(document).find('.datos-basicos').append("<i class='glyphicon glyphicon-remove-sign' style='position: absolute; right: 20px; top: 22px;'></i>");
        }
    } else {
        $(document).find('.datos-basicos').addClass('btn-desplegar').removeClass('btn-danger');
        $(document).find('.datos-basicos').find('.glyphicon-remove-sign').remove();
    }

    if (countCreacion == true && countBasicos == true) {
        let datos = $(this).serializeArray();
        var data = new FormData();
        $.each(datos, function (key, value) {
            data.append(value.name, value.value);
        });
        data.append('file', foto[0].files[0]);

        $.ajax({
            url: 'http://192.168.0.25/cibersat3.0/reparaciones/crear-usuario',
            type: "POST",
            crossDomain: true,
            data: data,
            dataType: "json",
            processData: false,
            contentType: false,
            success: function (data) {
                if (data.success == true) {
                    // location.reload();
                }
            }
        });
    }
});