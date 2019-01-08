import React from 'react'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap'
export default class LoginCard extends React.Component {
  render() {
    return (
      <div className="center" style={style.container}>
        <Card style={style.card}>
          <CardBody>
            <CardTitle style={style.title}>{this.props.text}</CardTitle>
            <Button block onClick={this.props.onClick}>
              {this.props.buttonText}
            </Button>
          </CardBody>
        </Card>
      </div>
    )
  }
}

const style = {
  container: {
    height: 128,
    // display:
  },
  card: {
    width: 300
  },
  title: {
    textAlign: 'center'
  }
}
