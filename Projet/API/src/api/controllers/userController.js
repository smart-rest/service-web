class UserController {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    getAll(req, res) {
        const users = this.userRepository.getAll();
        res.json(users);
    }

    create(req, res) {
        const user = this.userRepository.add(req.body);
        res.location('/users/' + user.id);
        res.status(201).send(user);
    }

    get(req, res) {
        const user = this.userRepository.get(req.params.userId);
        if (user == null) {
            res.status(404).send(null);
        } else {
            res.status(200).send(user);
        }
    }

    update(req, res) {
        const user = this.userRepository.update(req.params.userId, req.body);
        res.status(200).send(user);
    }

    delete(req, res) {
        this.userRepository.delete(req.params.userId);
        res.status(204).send(null);
    }
}

module.exports = UserController;