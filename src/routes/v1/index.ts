import { makePath } from "../../lib/utils";
import { getId, search } from "./db";
export default class Routes {
  version = 1;
  constructor(app: any) {
    app.use(makePath(this.version, "/search"), async (c: any) => {
      const { q } = c.req.query();
      const records = await search(
        q,
        c.env.XATA_DATABASE_URL,
        c.env.XATA_API_KEY,
        c.env.XATA_BRANCH
      );

      return c.json(records, 200);
    });

    app.use(makePath(this.version, "/objects/dso/:id"), async (c: any) => {
      const { id } = c.req.param();
      const { record, code } = await getId(
        id,
        "dso",
        c.env.XATA_DATABASE_URL,
        c.env.XATA_API_KEY,
        c.env.XATA_BRANCH
      );

      return c.json(record, code);
    });
  }
}
