
class Page {
    #currentPage;
    #onPageChange;
    #minPage;
    #maxPage;

    constructor(initialPage = 1, onPageChange, { minPage, maxPage }) {
        this.#currentPage = initialPage;
        this.#onPageChange = onPageChange;
        this.#minPage = minPage;
        this.#maxPage = maxPage;
        onPageChange(initialPage);
    }

    get current() {
        return this.#currentPage;
    }

    next() {
        if (this.#currentPage < this.#maxPage) {
            this.#currentPage++;
            this.#onPageChange(this.#currentPage);
        }
    }

    previous() {
        if (this.#currentPage > this.#minPage) {
            this.#currentPage--;
            this.#onPageChange(this.#currentPage);
        }
    }
}

export const paginate = (initialPage = 1, renderer) => {
    const page = new Page(initialPage, renderer, { minPage: 1, maxPage: 10 });

    document.addEventListener("click", (event) => {
        if (event.target.nodeName !== "BUTTON") return;

        const pageAction = event.target.dataset["page"];

        switch (pageAction) {
            case "next": return page.next();
            case "previous": return page.previous();
            default:
                throw new Error(`Unknown page action of "${pageAction}".`);
        }
    });
};
