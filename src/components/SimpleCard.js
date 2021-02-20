import React, {Component,Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
class SimpleCard  extends Component {

    render(){
        return (
          <Fragment>
            <Card className="card">
              <CardContent classname = "text">
                <Typography className="" color="textSecondary" gutterBottom>
                <h3>  {this.props.title} </h3>
                </Typography>
        
                <Typography variant="body2" component="p">
                    {this.props.body}
                </Typography>
              </CardContent>
            </Card>
  </Fragment>
          );
    }
}

export default SimpleCard;
