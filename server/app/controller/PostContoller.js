import { prisma } from "../prisma/prisma.js";

class PostController {
    async create(req, res) {
        try {
            const { title } = req.body;
            const {refreshToken} = req.cookies;
            const animeId = Number(req.params.id);
            if(!title) {
                return  res.status(400).json({error: "Пустая строка"})
            }

            const token = await prisma.token.findFirst({
                where:{
                    refreshToken: refreshToken
                }
            })
            
            if(!token) {
               return res.status(400).json({ message: 'No valid' })
            }

            const comment = await prisma.post.create({
                data: {
                    animeId: animeId,
                    authorId: token.userId,
                    title: title,
                }
            })

            res.json(comment);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }

    }

    async getAll(req, res) {
       try {
    const animeId = Number(req.params.id);

    const comments = await prisma.post.findMany({
      where: {
        animeId: animeId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      }, orderBy: {createdAt:'desc'}
    });

    return res.json(comments);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
    }
    async getOne(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ message: 'Id не указан' })
            }
            const posts = await Post.findById(id)
            return res.json(posts)
        } catch (err) {
            res.status(500).json({ error: err.message });
        }

    }
    async update(req, res) {
        try {
            const post = req.body;
            if (!post._id) {
                res.status(400).json({ message: 'Id не указан' })
            }
            const updatedPost = await Post.findByIdAndUpdate(post._id, post, { new: true })
            return res.json(updatedPost)
        } catch (err) {
            res.status(500).json({ error: err.message });
        }

    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            if (!post._id) {
                res.status(400).json({ message: 'Id не указан' })
            }
            const post = await Post.findOneAndDelete(id)
            return res.json(post)

        } catch (err) {
            res.status(500).json({ error: err.message });
        }

    }
}

export default new PostController();
