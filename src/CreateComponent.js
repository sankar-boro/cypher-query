import './App.css';
import { useEffect, useState } from 'react';
import CreateCols from "./CreateCols";

function CreateComponent(props) {
    const { activeParent, setParentAst, setGenQuery, genQuery, parentAst } = props;
  const [nodeName, setNodeName] = useState('');
  const [ast, setAst] = useState(null);
  useEffect(() => {
    setAst(activeParent)
  }, [])

  return (
    <div>
        {ast && !ast.NODE.set ? <>
            <div>CreateComponent</div>
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
                    if (x.name === 'CREATE') {
                        return { ...x, name: 'CREATE', value: nodeName, set: true }
                    }
                    return x
                }) }};
                console.log('cr', cr);
                setParentAst(cr) 
            }}>Create</button>
        </div>
        </>: <CreateCols {...props} />}
        
    </div>
  );
}

export default CreateComponent;
