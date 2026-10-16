class HomeController {
  constructor(linkRepository) {
    this.linkRepository = linkRepository;
  }

  async index(req, res) {
    const query = req.query.q || '';
    const links = await this.linkRepository.findByQuery(query);

    res.render('home', {
      title: 'SportHub News',
      query,
      links,
    });
  }

  async delete(req, res) {
    await this.linkRepository.deleteById(req.params.id);
    const query = req.body.q;
    const redirectUrl = query ? `/?q=${encodeURIComponent(query)}` : '/';

    res.redirect(303, redirectUrl);
  }
}

export default HomeController;
