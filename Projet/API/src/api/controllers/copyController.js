class CopyController {
    constructo(copyRepository) {
        this. copyRepository = copyRepository;
    }

    getAll(req, res) { 
        const copies = this.copyRepository.getAll();
        res.json(copies);
    }

    create(req, res) {
        const copy = this.copyRepository.add(req.body);
        res.location('/books[' + copy.bookId + ']/copies/' + copy.id);
        res.status(201).send(copy);
    }

    get(req, res) {
        const copy = this.copyRepository.get(req.params.id);
        if (copy == null) {
            res.status(404).send(null);
        } else {
            res.status(200).send(copy)
        }
    }

    update(req, res) {
        const copy = this.copyRepository.update(req.params.id, req.body);
        res.status(200).send(copy);
    }

    delete(req, res) {
        this.copyRepository.delete(req.params.id);
        res.status(204).send(null);
    }
}

module.exports = CopyController;