import React from 'react';


export const ModalNewTask = () => {
    return (
      <div>
       <button type="button" className="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">New task +</button>
  
  <div className="modal fade bd-example-modal-lg" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        ...
      </div>
    </div>
  </div>
      </div>
    );
};

export default ModalNewTask;
  