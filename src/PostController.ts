@Controller('posts')
@UseGuards(AuthGuard())
export class PostController {
  constructor(private readonly postService: PostService, private readonly authService: AuthService) {}

  @Post()
  async create(@Req() req: Request, @Body() { title, text }: CreatePostDto): Promise<void>
