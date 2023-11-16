const DynamoDBTblList = (props) => {
  console.log(props)
  return (
    props.tbls.map((tbl) => {
      return (
        <DynamoDBTbl tbl={tbl}></DynamoDBTbl>
      )
    })
  )
}