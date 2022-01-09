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


