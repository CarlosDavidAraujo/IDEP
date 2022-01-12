<<<<<<< HEAD
const { getFirestore, collection, query, getDocs, setDoc, doc, addDoc } = require("firebase/firestore");
const fireapp = require("./firebaseInitialize");
const { getStorage, ref, getDownloadURL, uploadBytes } = require('firebase/storage');

const storage = getStorage(fireapp);
const db = getFirestore();
function verificaErro (errorCode) {
    switch (errorCode) {
        case 'storage/unknown':
            return 'An unknown error occurred.';
        case 'storage/object-not-found':
            return 'No object exists at the desired reference.';
        case 'storage/bucket-not-found':
            return 'No bucket is configured for Cloud Storage';
        case 'storage/project-not-found':
            return 'No project is configured for Cloud Storage'
        case 'storage/quota-exceeded':
            return "Quota on your Cloud Storage bucket has been exceeded. If you're on the free tier, upgrade to a paid plan. If you're on a paid plan, reach out to Firebase support.";
        case 'storage/unauthenticated':
            return 'User is unauthenticated, please authenticate and try again.';
        case 'storage/unauthorized':
            return 'User is not authorized to perform the desired action, check your security rules to ensure they are correct.';
        case 'storage/retry-limit-exceeded':
            return 'The maximum time limit on an operation (upload, download, delete, etc.) has been excceded. Try uploading again.';
        case 'storage/invalid-checksum':
            return 'File on the client does not match the checksum of the file received by the server. Try uploading again.';
        case 'storage/canceled':
            return 'User canceled the operation.';
        case 'storage/invalid-event-name':
            return 'Invalid event name provided.Must be one of[`running`, `progress`, `pause`]';
        case 'storage/invalid-url':
            return 'Invalid URL provided to refFromURL(). Must be of the form: gs://bucket/object or https://firebasestorage.googleapis.com/v0/b/bucket/o/object?token=<TOKEN>';
        case 'storage/invalid-argument':
            return 'The argument passed to put() must be `File`, `Blob`, or `UInt8` Array. The argument passed to putString() must be a raw, `Base64`, or `Base64URL` string.';
        case 'storage/no-default-bucket':
            return "No bucket has been set in your config's storageBucket property.";
        case 'storage/cannot-slice-blob':
            return "Commonly occurs when the local file has changed (deleted, saved again, etc.). Try uploading again after verifying that the file hasn't changed.";
        case 'storage/server-file-wrong-size':
            return 'File on the client does not match the size of the file recieved by the server. Try uploading again.';
        default:
            return null;
    }
};

module.exports = {
    
    consultaVagas: async function () {
        let vagas = {}
        const vagas_disponiveis = query(collection(db, "Vagas"));
        const querySnapshot = await getDocs(vagas_disponiveis);
        querySnapshot.forEach((doc) => {
            vagas[doc.id] = doc.data();;
        });
        return vagas;
    },

    /*essa parte ainda está em desenvolvimento, por enquanto so foi implementada uma função que permite o upload de arquivos para o db,
     neste caso adiciona a logo da empresa ao cabeçalho da vaga*/
    adicionaVaga: function (file_buffer, file_name, mimetype, dados_vaga) {
        //const uploadDate = new Date();
        //const imgName = uploadDate+file_name;
        const metadata = {
            contentType: mimetype,
        };
        //cria a referencia do local onde a imagem sera salva no banco de dados
        const imgRef = ref(storage, "images/" + file_name);
        //faz o upload da imagem
        uploadBytes(imgRef, file_buffer, metadata).then((snapshot) => {
            //após o upload extrai a url da imagem
            getDownloadURL(imgRef)
                .then((url) => {
                    //adiciona vaga com o campo que conterá a url da imagem
                    var docRef = collection(db, "Vagas")
                    addDoc(docRef, dados_vaga).then((DocumentReference) => {
                        //após adicionar a vaga acrescenta o campo que conterá o ID da vaga
                        var docRef = doc(db, "Vagas", DocumentReference.id)
                        setDoc(docRef, { ID: DocumentReference.id, url_img: url }, { merge: true })
                    })
                })
                .catch((error) => {
                    const errorCode = error.code;
                    let mensagemDeErro = verificaErro(errorCode);
                    console.log(mensagemDeErro)
                });
        });
    }
}
=======
import { getFirestore, collection, query, getDocs} from "firebase/firestore";

const db = getFirestore();

async function consultaVagas() {
    let vagas = {}
    const vagas_disponiveis = query(collection(db, "Vagas"));
    const querySnapshot = await getDocs(vagas_disponiveis);
    querySnapshot.forEach((doc) => {
        vagas[doc.id] = doc.data();;
    });
    return vagas;
}

export default consultaVagas;


>>>>>>> 00eef85c7672fd56ab6c45e177e941100399a89e
