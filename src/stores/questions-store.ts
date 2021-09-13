import { writable } from 'svelte/store';

export const questions = writable<string[]>([]);
export const totalNbrOfQuestions = writable<number>(0);

export const setQuestions = (qs: string[]) => {
	questions.set(qs);
	totalNbrOfQuestions.set(qs.length);
};

export const nextQuestion = (curr: string) => {
	questions.update((q) => {
		return q.filter((question) => question !== curr);
	});

	return null;
};
