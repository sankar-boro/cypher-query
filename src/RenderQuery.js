export default function RenderQuery({ ast }) {
    return <div>
        {ast.PARENT.set ? <span>{ast.PARENT.name}</span>: null}
        {ast.PARENT.selfSyn.open}
        {ast.PARENT.set && ast.PARENT.name === 'CREATE' && ast.PARENT.values.map((m) => {
            if (m.name === ast.PARENT.name) {
                return <span>{m.value}
                {m.selfSyn.open}
                {m.NODE.cols.map((x) => {
                    return <span>{x.colName}: {x.colType}, </span>
                })}
                {m.selfSyn.close}
                </span>
            } 
            return null;
        })}
        {ast.PARENT.set && ast.PARENT.name === 'MATCH' && ast.PARENT.values.map((m) => {
            if (m.name === ast.PARENT.name) {
                return <span>{m.value}
                {/* {m.selfSyn.open} */}
                {/* {m.NODE.cols.map((x) => {
                    return <span>{x.colName}: {x.colType}, </span>
                })} */}
                {/* {m.selfSyn.close} */}
                </span>
            } 
            return null;
        })}
        {ast.PARENT.selfSyn.close}
    </div>
}