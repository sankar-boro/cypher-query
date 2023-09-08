import React, { useContext, useReducer } from "react";

export const setters = (state, action) => {
    const { keys, values } = action;
    if (keys && values && keys.length === values.length) {
        if (keys.length === values.length) {
            const updateData = {};
            keys.forEach((keyName, keyIndex) => {
                if (state.hasOwnProperty(keyName)) {
                    updateData[keyName] = values[keyIndex];
                }
            })
            return {
                ...state,
                ...updateData
            };
        }
    }
    return state;
}

export const ServiceContext = React.createContext({
    query: null,
    dispatch: (data) => {
        console.log(data);
    },
});

const homeState = {
    query: null,
    dispatch: (data) => {
    }
}

export const useServiceContext = () => useContext(ServiceContext);

const reducer = (state, action) => {
    return setters(state, action);
}

export const ServiceProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, homeState);

    return (
        <ServiceContext.Provider
            value={{
                ...state,
                dispatch,
            }}
        >
            {props.children}
        </ServiceContext.Provider>
    );
};