import './App.css';
import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { uploadImage } from './functions/functions';

function App() {

    //Image handling in CKEditor5
    
    function uploadAdapter(loader) {
      return {
        upload: () => {
          return new Promise((resolve, reject) => {
            const body = new FormData();
            loader.file
              .then((file) => {
                body.append("uploadImg", file);
                uploadImage(body)
                  .then((res) => {
                    const imageUrl = `http://localhost:8000/ckeditor/${res.data.url}`;
                    resolve({ default: imageUrl });
                  })
                  .catch((err) => console.log(err));
              })
              .catch((err) => reject(err));
          });
        },
      };
    }
    

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  return (
    <div className="main container">
      <h2 className='heading'>Upload Image using CKEditor5 </h2>
                <CKEditor

                    editor={ ClassicEditor }

                    // data="<p>Hello from CKEditor 5!</p>"
                    // onReady={ editor => {
                    //     console.log( 'Editor is ready to use!', editor );
                    // } }

                    config={{
                      extraPlugins: [uploadPlugin],
                    }}

                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }

                />
    </div>
  );
}

export default App;
