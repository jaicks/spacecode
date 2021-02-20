import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class Comments  extends Component {

    render(){
        return (
            <Card className="card">
              <CardContent classname = "commentbody">
                <div className = "commentbodyinner">
                   <h5> {this.props.name}<br/></h5>
                    <h5>{this.props.email}</h5>
                </div>
                <div>
                   <strong> {this.props.body} </strong>
                </div>
              </CardContent>
            </Card>
          );
    }
}

export default Comments;
