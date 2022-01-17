const { getFirestore, collection, query, getDocs, setDoc, doc, addDoc, orderBy, limit, deleteDoc, serverTimestamp, where, startAfter } = require("firebase/firestore");
const fireapp = require("./firebaseInitialize");
const { getStorage, ref, getDownloadURL, uploadBytes } = require('firebase/storage');

const storage = getStorage(fireapp, "projeto-integrado-i-dfb90.appspot.com");
const db = getFirestore();
function verificaErro(errorCode) {
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

    consultaTodasVagas: async function () {
        let vagas = {}
        const vagas_disponiveis = query(collection(db, "Vagas"), orderBy('Data_de_criação', 'desc'));
        const querySnapshot = await getDocs(vagas_disponiveis);
        querySnapshot.forEach((doc) => {
            vagas[doc.id] = doc.data();;
        });
        return vagas;
    },

    consultaVagasMaisRecentes: async function (limite) {
        let vagas = {}
        const collectionRef = collection(db, 'Vagas');
        const q = query(collectionRef, orderBy("Data_de_criação", "desc"), limit(limite));
        const documentSnapshots = await getDocs(q);
        documentSnapshots.forEach((doc) => {
            vagas[doc.id] = doc.data();
        })
        return vagas
    },

    primeiraPagina: async function (limite) {
        let vagas = {}
        const first = query(collection(db, "Vagas"), orderBy("Data_de_criação", 'desc'), limit(limite));
        const documentSnapshots = await getDocs(first);
        const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
         documentSnapshots.forEach((doc)=>{
            vagas[doc.id] = doc.data();
        })
        return [vagas ,lastVisible];
    },

    proximaPagina: async function (ultimaVaga, limite) {
        let vagas = {};
        const next = query(collection(db, "Vagas"), orderBy("Data_de_criação", 'desc'), startAfter(ultimaVaga), limit(limite));
        const documentSnapshots = await getDocs(next);
        const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
        documentSnapshots.forEach((doc) => {
            vagas[doc.id] = doc.data();
        })
        return vagasVisiveis = [vagas, lastVisible];
    },

    filtraVaga: async function (campo, valor) {
        let vagasFiltradas = {}
        const q = query(collection(db, "Vagas"), where(campo, "==", valor));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            vagasFiltradas[doc.id] = doc.data();
        });
        return vagasFiltradas;
    },

    adicionaVaga: async function (file_buffer, file_name, mimetype, dados_vaga) {
        const collectionRef = collection(db, "Vagas")
        //se não houver imagem
        if (file_buffer == null || file_name == null || mimetype == null) {
            return addDoc(collectionRef, dados_vaga).then((DocumentReference) => {
                //após adicionar a vaga acrescenta o campo que conterá o ID da vaga
                const docRef = doc(db, "Vagas", DocumentReference.id)
                setDoc(docRef, { ID: DocumentReference.id, url_img: null }, { merge: true })
            });
        }
        //se houver imagem
        else {
            const metadata = { contentType: mimetype, };
            const nomeImg = file_name + data
            const imgRef = ref(storage, "images/" + nomeImg);
            return uploadBytes(imgRef, file_buffer, metadata).then((snapshot) => {
                //após o upload extrai a url da imagem
                getDownloadURL(imgRef)
                    .then((url) => {
                        addDoc(collectionRef, dados_vaga).then((DocumentReference) => {
                            //após adicionar a vaga acrescenta os campos que conterãoo ID da vaga e a logo da empresa
                            const docRef = doc(db, "Vagas", DocumentReference.id)
                            setDoc(docRef, { ID: DocumentReference.id, url_img: url }, { merge: true })
                        });
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        let mensagemDeErro = verificaErro(errorCode);
                        console.log(mensagemDeErro)
                    });
            });
        }
    },

    removeVaga: async function (vaga_id) {
        return await deleteDoc(doc(db, "Vagas", vaga_id));
    },

    editaVaga: async function (vaga_id, file_buffer, file_name, mimetype, dados_vaga) {
        const docRef = doc(db, "Vagas", vaga_id)
        if (file_buffer == null || file_name == null || mimetype == null) {
            return setDoc(docRef, dados_vaga, { merge: true })
        } else {
            const metadata = { contentType: mimetype };
            const imgRef = ref(storage, "images/" + file_name);
            return uploadBytes(imgRef, file_buffer, metadata).then((snapshot) => {
                //após o upload extrai a url da imagem
                getDownloadURL(imgRef)
                    .then((url) => {
                        setDoc(docRef, dados_vaga + { url_img: url }, { merge: true })
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        let mensagemDeErro = verificaErro(errorCode);
                        console.log(mensagemDeErro)
                    });
            });
        }
    }
}




