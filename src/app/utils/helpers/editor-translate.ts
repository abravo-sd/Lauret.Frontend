export const editorTranslate = () => {
  document.querySelector("angular-editor-toolbar [title='Undo']").setAttribute('title', 'Deshacer');
  document.querySelector("angular-editor-toolbar [title='Redo']").setAttribute('title', 'Rehacer');
  document.querySelector("angular-editor-toolbar [title='Bold']").setAttribute('title', 'Negrita');
  document.querySelector("angular-editor-toolbar [title='Italic']").setAttribute('title', 'Cursiva');
  document.querySelector("angular-editor-toolbar [title='Underline']").setAttribute('title', 'Subrayado');
  document.querySelector("angular-editor-toolbar [title='Strikethrough']").setAttribute('title', 'Tachado');
  document.querySelector("angular-editor-toolbar [title='Subscript']").setAttribute('title', 'Subguión');
  document.querySelector("angular-editor-toolbar [title='Superscript']").setAttribute('title', 'Superguión');
  document
    .querySelector("angular-editor-toolbar [title='Justify Left']")
    .setAttribute('title', 'Justificar a la izquierda');
  document.querySelector("angular-editor-toolbar [title='Justify Center']").setAttribute('title', 'Justificar centro');
  document
    .querySelector("angular-editor-toolbar [title='Justify Right']")
    .setAttribute('title', 'Justificar a la derecha');
  document.querySelector("angular-editor-toolbar [title='Justify Full']").setAttribute('title', 'Justificar completo');
  document.querySelector("angular-editor-toolbar [title='Indent']").setAttribute('title', 'Sangría');
  document.querySelector("angular-editor-toolbar [title='Outdent']").setAttribute('title', 'Sangrar');
  document.querySelector("angular-editor-toolbar [title='Unordered List']").setAttribute('title', 'Lista desordenada');
  document.querySelector("angular-editor-toolbar [title='Ordered List']").setAttribute('title', 'Lista ordenada');
  document.querySelector("angular-editor-toolbar [title='Text Color']").setAttribute('title', 'Color del texto');
  document.querySelector("angular-editor-toolbar [title='Background Color']").setAttribute('title', 'Color de fondo');
  document.querySelector("angular-editor-toolbar [title='Insert Link']").setAttribute('title', 'Insertar enlace');
  document.querySelector("angular-editor-toolbar [title='Unlink']").setAttribute('title', 'Desenlazar');
  document.querySelector("angular-editor-toolbar [title='Insert Image']").setAttribute('title', 'Insertar imagen');
  document.querySelector("angular-editor-toolbar [title='Horizontal Line']").setAttribute('title', 'Línea horizontal');
  document.querySelector("angular-editor-toolbar [title='Clear Formatting']").setAttribute('title', 'Borrar formato');
  document.querySelector("angular-editor-toolbar [title='HTML Code']").setAttribute('title', 'Código HTML');
};
