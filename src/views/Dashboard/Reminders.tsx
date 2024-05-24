import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import React, { useState } from "react";




const Reminders: React.FC = () => {
    return (
        <>

            <Card variant="outlined">
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Tarea Ecuaciones Diferenciales
                    </Typography>
                    
                    <Typography className="text-danger" sx={{ mb: 1.5 }}>
                        urgent
                    </Typography>
                    <Typography variant="body2">
                        hoja de trabajo #2
                        <br />
                        {'"24/05"'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Done</Button>
                </CardActions>
            </Card>
        
        </>
    );
};


export default Reminders;