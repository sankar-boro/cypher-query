import './App.css';
import { useEffect, useState } from 'react';

const columnTypes = [
    {
        name: 'String',
    },
    {
        name: 'number',
    },
    {
        name: 'float'
    }
];

function CreateCols(props) {
    const { activeParent, setParentAst, setGenQuery, genQuery, parentAst } = props;
    const [colName, setColName] = useState('');
    const [colType, setColType] = useState(null);
    const [cols, setCol] = useState([]);
    
    return (
        <div>
            <input placeholder='column name' value={colName} onChange={(e) => {
                setColName(e.target.value)
            }} />
            <select name="colType" id="columns" value={colType} onChange={(e) => { 
                setColType(e.target.value)
            }}>
                <option value={null}>Select an option</option>
                {
                    columnTypes.map((m) => {
                        return <option value={m.name}>{m.name}</option>
                    })
                }
            </select>
            <button onClick={() => {
                if (colName && colType) {
                    let __cols = cols;
                    __cols.push({
                        colName,
                        colType,
                    }) 
                    setCol(__cols)
                    let cr = { PARENT: { ...parentAst.PARENT, values: parentAst.PARENT.values.map((x) => {
                        if (x.name === 'CREATE') {
                            const data = { ...x, NODE: { ...x.NODE, cols: __cols } }
                            return data;
                        }
                        return x
                    }) }};
                    console.log(cr);
                    setParentAst(cr) 
                }
            }}>
                Create
            </button>
        </div>
    );
}

export default CreateCols;
