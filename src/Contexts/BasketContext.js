import { createContext, useContext, useReducer, useEffect } from 'react';

const BasketContext = createContext();

const initialState = {
    items: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_BASKET':
            const updatedItems = [...state.items, action.payload];
            localStorage.setItem('basket', JSON.stringify(updatedItems));
            return {
                ...state,
                items: updatedItems,
            };
        case 'EMPTY_BASKET':
            localStorage.removeItem('basket');
            return {
                ...state,
                items: [],
            };
        default:
            return state;
    }
};

const BasketProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const storedBasket = localStorage.getItem('basket');
        if (storedBasket) {
            dispatch({ type: 'ADD_TO_BASKET', payload: JSON.parse(storedBasket) });
        }
    }, []);

    const addToBasket = (item) => {
        dispatch({ type: 'ADD_TO_BASKET', payload: item });
    };

    const emptyBasket = () => {
        dispatch({ type: 'EMPTY_BASKET' });
    };

    return (
        <BasketContext.Provider value={{ state, addToBasket, emptyBasket }}>
            {children}
        </BasketContext.Provider>
    );
};

const useBasket = () => {
    const context = useContext(BasketContext);
    if (!context) {
        throw new Error('badly set provider');
    }
    return context;
};

export { BasketProvider, useBasket };