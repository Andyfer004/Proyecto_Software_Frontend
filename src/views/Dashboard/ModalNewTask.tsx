import { Button } from '@mui/material';
import React from 'react';


export const ModalNewTask = () => {
    return (
      <div>
            <Button variant="contained" size="large">+ New</Button>  
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
  