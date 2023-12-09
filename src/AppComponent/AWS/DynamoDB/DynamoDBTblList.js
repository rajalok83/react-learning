const DynamoDBTblList = (props) => {
  return (
    Object.keys(props.tbls).map((tbl) => {
      return (
        <DynamoDBTbl columnsHeader={props.columnsHeader} tblnm={tbl} tbl_dtl={props.tbls[tbl]} onTblDrop={props.onTblDrop} onColDrop={props.onColDrop} onColAdd={props.onColAdd} onColChange={props.onColChange}></DynamoDBTbl>
      )
    })
  )
}