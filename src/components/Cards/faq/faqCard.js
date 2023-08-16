import React from 'react';

import {
    Card,
    CardTitle,
    CardHeader,
    CardBody
} from 'reactstrap';

class faqCard extends React.Component{
    render(){
        return (
            <Card class="card p-6">
            <CardHeader className="card-header" id="faqHeading7">
              <CardTitle className="card-title font-size-h4 text-dark" data-toggle="collapse" data-target="#faq7" aria-expanded="false" aria-controls="faq7" role="button">
                   <div className="card-label">How does shipping work? </div>    
                  </CardTitle>
            </CardHeader>
            <div id="faq7" className="collapse" aria-labelledby="faqHeading7">
              <CardBody className="card-body pt-3 font-size-h6 font-weight-normal text-dark-50">
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
              </CardBody>
            </div>
            {/*end::Body*/}
          </Card>
        )
    }
}

export default faqCard