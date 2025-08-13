export default function FastResults({data}) {
  
  return (
    <section className="fast-results">
      <h2 className="fast-results-title">{data.fast_results_title}</h2>
      <div className="fast-results-grid">

{data["fa-result"].map((item, index) => ( 
            <div className="result-box" key={index}>
          <h3>{item.percent_result}</h3>
          <p>{item.percent_result_description}</p>
        </div>
        
))}



      </div>
    </section>
  );
}
