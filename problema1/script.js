$(document).ready(function() {
    $('option').on('dblclick', function() {
        moveElement(this.id);
    });
})

function moveElement(elementId){
    var elementSelectat = $('#' + elementId);
    var listaSursa = elementSelectat.parent();
    var listaDestinatie;
    if (listaSursa.attr('id') == 'select1') {
        listaDestinatie = $('#select2');
    }
    else{
         listaDestinatie = $('#select1');
    }
    elementSelectat.detach().appendTo(listaDestinatie);
}

