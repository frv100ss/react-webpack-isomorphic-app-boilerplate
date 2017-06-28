import React from "react";
import {Card, CardTitle} from "material-ui/Card";
import ThumbnailArticles from "../components/thumbnail/ThumbnailArticles"

const HomePage = props => (
  <Card className="container">
    <CardTitle title="React Home Page" subtitle="This is The Home page."/>
      <ThumbnailArticles {...props}/>
  </Card>
);
export default HomePage;