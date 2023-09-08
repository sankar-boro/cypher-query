import './App.css';
import { useState } from 'react';
import MatchComponent from "./MatchComponent";
import CreateComponent from "./CreateComponent";
import RenderQuery from './RenderQuery';

const data = {
  PARENT: {
    set: false,
    name: '',
    selfSyn: {
      open: "(",
      close: ")"
    },
    values: [
      {
        name: 'CREATE',
        value: '',
        set: false,
        selfSyn: {
          open: "{",
          close: "}"
        },
        NODE: {
          name: "",
          set: false,
          cols: [
  
          ]
        }
      },
      {
        name: 'MATCH',
        set: false,
        selfSyn: {
          open: "(",
          close: ")"
        },
        NODE: {
          name: "",
          set: false,
          cols: [
  
          ]
        }
      }
    ]
  }
}

function App() {
  const [genQuery, setGenQuery] = useState("");
  const [ast, setAst] = useState(data)
  const [activeParent, setActiveParent] = useState(null);

  return (
    <div className="App">
      {!ast.PARENT.set ? <div>
        {ast.PARENT.values.map((v) => {
          return <div key={v.name} onClick={() => {
            const t = { PARENT: { ...ast.PARENT, set: true, name: v.name }};
            setGenQuery(v.name)
            setActiveParent(v)
            setAst(t)
          }}>{v.name}</div>
        })}
      </div> : null}
      {
        ast.PARENT.set && ast.PARENT.name === 'CREATE' ? <CreateComponent 
        activeParent={activeParent} 
        setGenQuery={setGenQuery} 
        genQuery={genQuery} 
        setParentAst={setAst} 
        parentAst={ast} 
        />: null
      }
      {
        ast.PARENT.set && ast.PARENT.name === 'MATCH' ? <MatchComponent activeParent={activeParent} 
        setGenQuery={setGenQuery} 
        genQuery={genQuery} 
        setParentAst={setAst} 
        parentAst={ast} />: null
      }
      <div style={{ marginTop: 20 }}>
        Query: <RenderQuery ast={ast} />
      </div>
    </div>
  );
}

export default App;
