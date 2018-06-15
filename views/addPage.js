const html = require('html-template-tag');
const layout = require('./layout');

module.exports = () =>
  layout(html`
  <h3>Add a Page</h3>
  <hr>
  <form method="POST" action="/wiki/">



    <div class="form-group">
    <label for="authorName" class="col-sm-2 control-label">Author Name</label>
    <div class="col-sm-10">
    <input id="authorName" name="authorName" type="text" class="form-control"/>
  </div>

  <label for="email" class="col-sm-2 control-label">Author Email</label>
  <div class="col-sm-10">
    <input id="email" name="email" type="text" class="form-control"/>
  </div>

      <label for="title" class="col-sm-2 control-label">Page Title</label>
      <div class="col-sm-10">
        <input id="title" name="title" type="text" class="form-control"/>
      </div>

      <label for="content" class="col-sm-2 control-label">Post Content</label>
      <div class="col-sm-10">
      <textarea id="content" name="content" type="text" class="form-control" rows="20">Type Content Here</textarea>
    </div>

    <div class="col-sm-10">
      <label for="pageStatus" class="col-sm-2 control-label">Page Status</label>
      <input id="pageStatus" name="pageStatus" type="text" class="form-control"/>
    </div>
    </div>




    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-primary">submit</button>
    </div>

  </form>
`);
