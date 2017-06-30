import React from "react";
import {Card} from "material-ui/Card";
import ThumbnailArticles from "../components/thumbnail/ThumbnailArticles"

const HomePage = props => (
  <Card className="container">
      <ThumbnailArticles {...props}/>
  </Card>
);
export default HomePage;