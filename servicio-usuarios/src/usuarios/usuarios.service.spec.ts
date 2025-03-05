import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { JwtAuthGuard } from '../autenticacion/jwt-auth.guard';
import { NotFoundException } from '@nestjs/common';

describe('UsuariosController', () => {
  let controller: UsuariosController;
  let service: UsuariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuariosController],
      providers: [
        {
          provide: UsuariosService,
          useValue: {
            obtenerPorId: jest.fn().mockResolvedValue({
              id: 1,
              nombre: 'Test User',
              email: 'test@example.com',
              password: 'hashedpassword', // Se eliminará en la respuesta
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<UsuariosController>(UsuariosController);
    service = module.get<UsuariosService>(UsuariosService);
  });

  it('debería devolver el perfil del usuario sin la contraseña', async () => {
    const req = { user: { id: 1 } };
    const perfil = await controller.obtenerPerfil(req);

    expect(perfil).toEqual({
      id: 1,
      nombre: 'Test User',
      email: 'test@example.com',
    });

    expect(service.obtenerPorId).toHaveBeenCalledWith(1);
  });

  it('debería lanzar un error si el usuario no existe', async () => {
    jest.spyOn(service, 'obtenerPorId').mockResolvedValue(null);

    await expect(controller.obtenerPerfil({ user: { id: 999 } }))
      .rejects.toThrow(new NotFoundException('Usuario no encontrado'));
  });
});
