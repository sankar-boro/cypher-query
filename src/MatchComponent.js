import './App.css';
import { useEffect, useState } from 'react';
import CreateCols from "./CreateCols";

export default function MatchComponent(props) {
    const { activeParent, setParentAst, setGenQuery, genQuery, parentAst } = props;
    const [nodeName, setNodeName] = useState('');
    const [ast, setAst] = useState(null);
    useEffect(() => {
        setAst(activeParent)
    }, [])

    return (
        <div>
            {ast && !ast.NODE.set ? <>
                <div>Which table</div>
            <div>
                <input 
                    placeholder='Node name' 
                    value={nodeName} 
                    onChange={(e) => { setNodeName(e.target.value) }} 
                />
                <button onClick={() => { 
                    setGenQuery(`${genQuery} ${nodeName}`)
                    setAst({...ast, NODE: { ...ast.NODE, name: nodeName, set: true }})
                    let cr = { PARENT: { ...parentAst.PARENT, values: parentAst.PARENT.values.map((x) => {
                        if (x.name === 'MATCH') {
                            return { ...x, name: 'MATCH', value: nodeName, set: true }
                        }
                        return x
                    }) }};
                    setParentAst(cr) 
                }}>Create</button>
            </div>
            </>: <CreateCols {...props} />}
            
        </div>
    );
}