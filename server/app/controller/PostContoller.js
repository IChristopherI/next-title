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
           
        } catch (err) {
            res.status(500).json({ error: err.message });
        }

    }
   async update(req, res) {
    try {
        const { id, title } = req.body;
        if (!id || !title?.trim()) {
            return res.status(400).json({ message: 'Id и текст обязательны' });
        }

        const { refreshToken } = req.cookies;
        const token = await prisma.token.findFirst({
            where: { refreshToken }
        });
        if (!token) {
            return res.status(401).json({ message: 'Не авторизован' });
        }

        const existing = await prisma.post.findUnique({ where: { id: Number(id) } });
        if (!existing) {
            return res.status(404).json({ message: 'Комментарий не найден' });
        }
        if (existing.authorId !== token.userId) {
            return res.status(403).json({ message: 'Нет прав на редактирование' });
        }

        const comment = await prisma.post.update({
            where: { id: Number(id) },
            data: { title },
            include: { author: { select: { id: true, name: true, email: true } } }
        });

        res.json(comment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

    async delete(req, res) {
        try {

        } catch (err) {
            res.status(500).json({ error: err.message });
        }

    }
}

export default new PostController();
