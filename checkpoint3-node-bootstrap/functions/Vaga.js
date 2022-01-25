const { getFirestore, collection, query, getDocs, setDoc, doc, addDoc, orderBy, limit, deleteDoc, serverTimestamp, where, onSnapshot } = require("firebase/firestore");
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
        let vagas = []
        const vagas_disponiveis = query(collection(db, "Vagas"), orderBy("Ultima_modificação", 'desc'));
        const snapshot = await getDocs(vagas_disponiveis)
        snapshot.forEach((doc) => {
            vagas.push(doc.data())
        });
        return vagas;
    },

    consultaVagasMaisRecentes: async function (limite) {
        let vagas = []
        const collectionRef = collection(db, 'Vagas');
        const q = query(collectionRef, orderBy("Ultima_modificação", "desc"), limit(limite));
        const documentSnapshots = await getDocs(q);
        documentSnapshots.forEach((doc) => {
            vagas.push(doc.data());
        })
        return vagas
    },

    paginador: function (items, current_page, per_page_items) {
<<<<<<< HEAD
        let page = parseInt(current_page) || 1,
=======
        let page = current_page || 1,
>>>>>>> d16c26e6b794b52aff23fa9839e96814ff619baf
            per_page = per_page_items || 10,
            offset = (page - 1) * per_page,

            paginatedItems = items.slice(offset).slice(0, per_page_items),
            total_pages = Math.ceil(items.length / per_page);

        return {
            page: page,
            per_page: per_page,
            pre_page: page - 1 ? page - 1 : null,
            next_page: (total_pages > page) ? page + 1 : null,
            total: items.length,
            total_pages: total_pages,
            data: paginatedItems
        };
    },

    filtraVaga: async function (campo, valor) {
        let vagasFiltradas = [];
        const q = query(collection(db, "Vagas"), where(campo, "==", valor));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            vagasFiltradas.push(doc.data());
        });
        return vagasFiltradas;
    },

    adicionaVaga: async function (file, dados_vaga) {
        const collectionRef = collection(db, "Vagas")
        if (file == null) {
<<<<<<< HEAD
            await addDoc(collectionRef, dados_vaga).then(async (DocumentReference) => {
                //após adicionar a vaga acrescenta o campo que conterá o ID da vaga
                const docRef = doc(db, "Vagas", DocumentReference.id)
                await setDoc(docRef, { ID: DocumentReference.id, url_logo: null }, { merge: true })
=======
            addDoc(collectionRef, dados_vaga).then((DocumentReference) => {
                //após adicionar a vaga acrescenta o campo que conterá o ID da vaga
                const docRef = doc(db, "Vagas", DocumentReference.id)
                setDoc(docRef, { ID: DocumentReference.id, url_logo: null }, { merge: true })
>>>>>>> d16c26e6b794b52aff23fa9839e96814ff619baf

            });
        } else {
            const metadata = { contentType: file.mimetype };
            const nomeImg = file.name + file.md5;
            const imgRef = ref(storage, "images/" + nomeImg);
<<<<<<< HEAD
            await uploadBytes(imgRef, file.data, metadata).then(async (snapshot) => {
                await getDownloadURL(imgRef)
                    .then(async (url) => {
                        await addDoc(collectionRef, dados_vaga).then(async (DocumentReference) => {
                            //após adicionar a vaga acrescenta os campos que conterãoo ID da vaga e a logo da empresa
                            const docRef = doc(db, "Vagas", DocumentReference.id)
                            await setDoc(docRef, { ID: DocumentReference.id, url_logo: url }, { merge: true })
=======
            uploadBytes(imgRef, file.data, metadata).then((snapshot) => {
                //após o upload extrai a url da imagem
                getDownloadURL(imgRef)
                    .then((url) => {
                        addDoc(collectionRef, dados_vaga).then((DocumentReference) => {
                            //após adicionar a vaga acrescenta os campos que conterãoo ID da vaga e a logo da empresa
                            const docRef = doc(db, "Vagas", DocumentReference.id)
                            setDoc(docRef, { ID: DocumentReference.id, url_logo: url }, { merge: true })
>>>>>>> d16c26e6b794b52aff23fa9839e96814ff619baf
                        });
                    })
            });
        }
    },

    removeVaga: async function (vaga_id) {
        return await deleteDoc(doc(db, "Vagas", vaga_id));
    },

    editaVaga: async function (vaga_id, logoImg, dados_vaga) {
        const docRef = doc(db, "Vagas", vaga_id);
        if (logoImg == null) {
<<<<<<< HEAD
            await setDoc(docRef, dados_vaga, { merge: true })
=======
            return setDoc(docRef, dados_vaga, { merge: true })
>>>>>>> d16c26e6b794b52aff23fa9839e96814ff619baf
        }
        else {
            const metadata = { contentType: logoImg.mimetype };
            const nomeImg = logoImg.name + logoImg.md5;
            const imgRef = ref(storage, "images/" + nomeImg);
<<<<<<< HEAD
            await uploadBytes(imgRef, logoImg.data, metadata).then(async (snapshot) => {
                await getDownloadURL(imgRef)
                    .then(async (url) => {
                        dados_vaga.url_logo = url;
                       await setDoc(docRef, dados_vaga, { merge: true })
=======
            return uploadBytes(imgRef, logoImg.data, metadata).then((snapshot) => {
                getDownloadURL(imgRef)
                    .then((url) => {
                        dados_vaga.url_logo = url;
                        setDoc(docRef, dados_vaga, { merge: true })
>>>>>>> d16c26e6b794b52aff23fa9839e96814ff619baf
                    })
            });
        }
    }
}





