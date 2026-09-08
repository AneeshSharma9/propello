import React, { useState, useEffect, useContext } from 'react'
import { AccountContext } from "../components/Account"
import Navbar from '../components/Navbar'
import { fetchData } from '../firebaseData';
import { useNavigate } from 'react-router-dom';

function ExplorePage() {
    const { user } = useContext(AccountContext);

    const [cardsData, setCardsData] = useState([]);
    const [searchWord, setSearchWord] = useState("");
    const [outgoingData, setOutgoingData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 15;

    const fetchDataFromFirestore = async () => {
        const data = await fetchData('services');
        setCardsData(data);
        const lowerSearchWord = searchWord.toLowerCase();
        const filteredData = searchWord !== ""
            ? data.filter(item => (item.service || "").toLowerCase().includes(lowerSearchWord))
            : data;
        setOutgoingData(filteredData);
        setCurrentPage(1);
    };

    useEffect(() => {
        fetchDataFromFirestore();
        // eslint-disable-next-line
    }, [searchWord]);

    const navigate = useNavigate();

    const toComponentB = (card) => {
        navigate('/request', { state: { card } });
    }

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = outgoingData.slice(indexOfFirstCard, indexOfLastCard);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(outgoingData.length / cardsPerPage); i++) {
        pageNumbers.push(i);
    }

    const clearing = () => {
        setSearchWord("");
    }

    return (
        <>
            <Navbar />
            <div className="offset"></div>
            <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '3rem' }}>
                <h1 className="customh1 mb-4">Browse Services</h1>
                <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap">
                    <div className="d-flex align-items-center">
                        <input
                            className="form-control mr-2"
                            type="search"
                            placeholder="Search by service..."
                            value={searchWord}
                            aria-label="Search"
                            style={{ width: '280px', height: '2.5rem' }}
                            onChange={(event) => setSearchWord(event.target.value)}
                        />
                        {searchWord && (
                            <button className="btn secondary-button" onClick={clearing} style={{ height: '2.5rem' }}>
                                Clear
                            </button>
                        )}
                    </div>
                    <div>
                        {user ? (
                            <a className="btn primary-button" href="profile" style={{ height: '2.5rem', lineHeight: '1.5rem' }}>+ Add Service</a>
                        ) : null}
                    </div>
                </div>

                <div className="d-flex flex-wrap justify-content-start">
                    {currentCards.map((card) => (
                        <div className="customcard card mr-3 mb-3" style={{ width: '21rem' }} key={card.id}>
                            <div className="card-body" style={{ padding: '1.25rem' }}>
                                <h5 className="card-title mb-1" style={{ fontSize: '1.05rem' }}>{card.name}</h5>
                                <p className="mb-2" style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    {card.service}
                                </p>
                                <p className="card-text" style={{ fontSize: '0.88rem', color: 'var(--text-light)', lineHeight: 1.5 }}>
                                    {(card.description || "").length > 60 ? `${card.description.substring(0, 60)}...` : card.description}
                                </p>
                                <button onClick={() => { toComponentB(card) }} className="primary-button btn" style={{ fontSize: '0.85rem', padding: '0.4rem 1.2rem' }}>
                                    Request
                                </button>
                            </div>
                        </div>
                    ))}
                    {currentCards.length === 0 && (
                        <div className="text-center w-100 py-5" style={{ color: 'var(--text-light)' }}>
                            <p style={{ fontSize: '1rem' }}>No services found.</p>
                        </div>
                    )}
                </div>

                {pageNumbers.length > 1 && (
                    <nav aria-label="Page navigation" className="pt-4">
                        <ul className="pagination justify-content-center">
                            {pageNumbers.map((number) => (
                                <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => setCurrentPage(number)} style={{ borderRadius: '6px', margin: '0 2px' }}>{number}</button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}
            </div>
        </>
    )
}

export default ExplorePage