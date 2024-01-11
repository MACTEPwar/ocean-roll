import { NavigateService } from "./navigate.service.js";
import { CatalogService } from "./catalog.service.js";
import { CommentService } from "./comment.service.js";
import { ReceiptService } from "./receipt.service.js";

export class AppView {
  providers = new Map([
    ["receiptService", new ReceiptService()],
    ["navigateService", new NavigateService(this, $("#content"))],
    ["commentService", new CommentService()],
    ["catalogService", new CatalogService()],
  ]);

  currentView;
}
