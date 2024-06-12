import React from 'react';
import DollList from '../components/DollsList'; // Importa el componente DollList
import RankingList from '../components/RankingList'; // Importa el componente RankingList

function Home() {
    return (
        <>
        <div className="mt-5">
            <RankingList /> {/* Muestra el componente RankingList */}
        </div>
        
        <div className="mt-5">
            <DollList /> {/* Muestra el componente DollList */}
        </div>
        </>
        
    );
}

export default Home;